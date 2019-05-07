import firebase from 'firebase/app'
import 'firebase/firestore'
import snackbar from '@/helpers/snackbar'

const ref = firebase.firestore().collection('requests')

const fetchById = async (id) => {
  let data = {}

  try {
    const result = await ref.doc(id).get()

    data = {
      id: result.id,
      ...result.data()
    }
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
  return data
}

const fetch = async () => {
  let data = []

  try {
    const result = await ref.where('closed', '==', false).get()

    for (let request of result.docs) {
      data.push({
        id: request.id,
        ...request.data()
      })
    }
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
  return data
}

const create = async ({ payload, labels }) => {
  let data = null

  try {
    const firstPipeline =
      await firebase
        .firestore()
        .collection('pipelines')
        .orderBy('order')
        .limit(1)
        .get()

    // Set request to first pipeline
    payload.pipelineId = firstPipeline.docs[0].id

    // Move content title
    payload.title = payload.content.title
    delete payload.content.title

    // Set to open
    payload.closed = false

    const result = await ref.add(payload)
    data = { id: result.id, ...payload }

    const batch = firebase.firestore().batch()

    // Add labels to request
    labels.forEach((p) => {
      batch.set(ref.doc(result.id).collection('labels').doc(p), {})
    })

    await batch.commit()

    data.labels = labels
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
  return data
}

const update = async ({ id, payload }) => {
  try {
    await ref.doc(id).set(payload)
  } catch (error) {
    snackbar.showSnackbar(error.message, 'error')
  }
}

export default {
  fetchById,
  fetch,
  create,
  update
}