//string ko object me convert karna hai or wo json string hai to parse method se usko krege..
// const jsonstring='{"name":"roshan","age":22,"city":"varanasi"}';
// const jsonobject=JSON.parse(jsonstring);
// console.log(jsonobject.name )

//object ko string me convert karna hai or wo json hai to stringfy method se usko krege..or wo string me aa jayega covert hoke
const jsonobject={"name":"roshan","age":22,"city":"varanasi"};
const jsonstring=JSON.stringify(jsonobject);
console.log(jsonstring)