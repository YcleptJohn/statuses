import { uiMeta } from '../../api/transformers/shared.js'
// I wanted to dynamically import configs from a preset array but es6 isn't happy with dynamic imports
// -- seems that it blocks it due to index.js in the same folder using FS modules so it must heavy-handedly
// block when a potential bad dynamic import is possible
import aws from '../../../config/aws.js'
import azure from '../../../config/azure.js'
import gcloud from '../../../config/gcloud.js'

const configs = [aws, azure, gcloud]
const metas = configs.map(c => uiMeta(c))

export default class Services {
  get() {
    return {
      names: metas.map(m => m.providerKey),
      configs,
      metas
    }
  }
}