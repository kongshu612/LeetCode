type GetReturnType<Type>= Type extends (...args:never[])=>infer Return?Return:never;

type Num = GetReturnType<()=>number>;
type Str = GetReturnType<(x:string)=>string>;



type ExtractPII<Type> = {
    [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
  };
  type DBFields = {
    id: { format: "incrementing" };
    name: { type: string; pii: true };
  };
  type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;

let test = {a:'hello',2:1}
type pt = number&keyof typeof test

type MyPartial<T>={
    [k in keyof T]?:T[k]
}
type MyRequired<T>={
    [k in keyof T]-?:T[k]
}
type MyPick<T,K extends keyof T>={
    [p in K]:T[p]
}
type MyReadonly<T>={
    readonly [k in keyof T]:T[k]
}
type MyRecord<keys extends keyof any,T>={
    [k in keys]:T
}
type MyExcluded<T,K>=T extends K?never:T;
type MyOmit<T,K extends keyof T>={
    [k in MyExcluded<keyof T,K>]:T[k]
}
type MyExtract<T,K>=T extends K?T:never;
type MyNonNullable<T>=T extends undefined|null?never:T;
type MyParameters<T extends (...args:any)=>any>=T extends (...args:infer P)=>any?P:never
type MyConstructorParameters<T extends new (...args:any)=>any>=T extends new (...args:infer P)=>any?P:never;
type MyReturnType<T extends (...args:any)=>any>=T extends (...args:any)=>infer P?P:any;
type MyInstanceType<T extends new (...args:any)=>any>=T extends new (...args:any)=>infer P ?P:any;


type Example={
    p1:number,
    p2:string,
    p3?:boolean;
}

class ClassExamp{
    a=0;
    b='hello';
}


type MyPartialDemo = MyPartial<Example>
type MyRequiredDemo = MyRequired<Example>
type MyPickDemo = MyPick<Example,'p1'>
type MyReadonlyDemo = MyReadonly<Example>
type MyRecordDemo = MyRecord<'hello'|'world',Example>
type MyOmitDemo = MyOmit<Example,'p1'>;
type MyExtractDemo = MyExtract<'a'|'b'|'c','a'>
type MyNonNullableDemo = MyNonNullable<number|string|null|undefined>
type MyParametersDemo = MyParameters<()=>void>
type MyConstructorParametersDemo = MyConstructorParameters<FunctionConstructor>
type MyReturnTypeDemo = MyReturnType<(...args:any)=>number>;
type MyInstanceTypeDemo = MyInstanceType<typeof ClassExamp>;

const tuple = <T extends string[]>(...args:T)=>args;