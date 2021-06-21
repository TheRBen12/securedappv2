#include <node.h>
#include <iostream>
#include "./node_modules/node-addon-api/napi.h"

//Gives access to the arguments in the java script file
void Sum(const v8::FunctionCallbackInfo<v8::Value>& args){

//gives us access to the scope of our javascript file
v8::Isolate* isolate = args.GetIsolate();

int i;
double a = 3.14, b = 2.718;
    for(i = 0; i< 10000; i++){
        a+=b;
        std::cout<<a<<std::endl;
    }

    auto total = v8::Number::New (isolate, a);

    args.GetReturnValue().Set(total);

}

void Initialize(v8::Local<v8::Object> exports){
NODE_SET_METHOD(exports, "sum", Sum);
}

NODE_MODULE(addon, Initialize);


