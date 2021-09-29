Module['locateFile'] = function(fileName, prefix) {
  if(fileName === 'itk_filteringWasm.wasm') {
    if (itk_filtering.isAbsoluteURL) {
      return itk_filtering.pipelinePath + 'Wasm.wasm'
    }
    if (typeof itk_filtering.moduleScriptDir !== 'undefined') {
      return itk_filtering.moduleScriptDir + '/itk_filteringWasm.wasm'
    }
    return prefix + '../Pipelines/itk_filteringWasm.wasm'
  }
  return prefix + fileName
}

var moduleStdout = null
var moduleStderr = null

Module['resetModuleStdout'] = function() {
  moduleStdout = ''
}

Module['resetModuleStderr'] = function() {
  moduleStderr = ''
}

Module['print'] = function(text) {
  console.log(text)
  moduleStdout += text + '\n'
}

Module['printErr'] = function(text) {
  console.log(text)
  moduleStderr += text + '\n'
}

Module['getModuleStdout'] = function() {
  return moduleStdout
}

Module['getModuleStderr'] = function() {
  return moduleStderr
}

Module['preRun'] = function() {
}
