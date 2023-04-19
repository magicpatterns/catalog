'use strict'
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        var desc = Object.getOwnPropertyDescriptor(m, k)
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k]
            },
          }
        }
        Object.defineProperty(o, k2, desc)
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.MirrorfulApiTimeoutError =
  exports.MirrorfulApiError =
  exports.MirrorfulApiClient =
  exports.MirrorfulApi =
    void 0
exports.MirrorfulApi = __importStar(require('./api'))
var Client_1 = require('./Client')
Object.defineProperty(exports, 'MirrorfulApiClient', {
  enumerable: true,
  get: function () {
    return Client_1.MirrorfulApiClient
  },
})
var errors_1 = require('./errors')
Object.defineProperty(exports, 'MirrorfulApiError', {
  enumerable: true,
  get: function () {
    return errors_1.MirrorfulApiError
  },
})
Object.defineProperty(exports, 'MirrorfulApiTimeoutError', {
  enumerable: true,
  get: function () {
    return errors_1.MirrorfulApiTimeoutError
  },
})
