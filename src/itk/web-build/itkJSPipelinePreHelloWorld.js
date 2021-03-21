Module['locateFile'] = function(fileName, prefix) {
  if(fileName === 'HelloWorldWasm.wasm') {
    if (HelloWorld.isAbsoluteURL) {
      return HelloWorld.pipelinePath + 'Wasm.wasm'
    }
    if (typeof HelloWorld.moduleScriptDir !== 'undefined') {
      return HelloWorld.moduleScriptDir + '/HelloWorldWasm.wasm'
    }
    return prefix + '../Pipelines/HelloWorldWasm.wasm'
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
