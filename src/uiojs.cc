#define _GNU_SOURCE
#define NAPI_EXPERIMENTAL
#include <sys/uio.h>
#include <stdint.h>
#include <napi.h>

Napi::Value _process_read(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() != 4) {
    Napi::TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  if (!info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsBuffer() || !info[3].IsNumber()) {
    Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }
  struct iovec remote[1];
  struct iovec local[1];

  remote[0].iov_base = (void *) info[1].As<Napi::Number>().Int64Value();
  remote[0].iov_len = info[3].As<Napi::Number>().Int64Value();

  local[0].iov_base = info[2];
  local[0].iov_len = info[3].As<Napi::Number>().Int64Value();

  pid_t pid = info[0].As<Napi::Number>().Uint32Value();

  return Napi::Number::New(env, process_vm_readv(pid, local, 1, remote, 1, 0));
}

Napi::Value _process_write(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() != 4) {
    Napi::TypeError::New(env, "Wrong number of arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  if (!info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsBuffer() || !info[3].IsNumber()) {
    Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
    return env.Null();
  }
  struct iovec remote[1];
  struct iovec local[1];

  remote[0].iov_base = (void *) info[1].As<Napi::Number>().Int64Value();
  remote[0].iov_len = info[3].As<Napi::Number>().Int64Value();

  local[0].iov_base = info[2];
  local[0].iov_len = info[3].As<Napi::Number>().Int64Value();

  pid_t pid = info[0].As<Napi::Number>().Uint32Value();

  return Napi::Number::New(env, process_vm_writev(pid, local, 1, remote, 1, 0));
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "_process_read"), Napi::Function::New(env, _process_read, "_process_read"));
  exports.Set(Napi::String::New(env, "_process_write"), Napi::Function::New(env, _process_write, "_process_write"));
  return exports;
}

NODE_API_MODULE(addon, Init)