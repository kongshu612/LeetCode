interface IUser{
    id?:string;
    name?:string;
    email?:string;
}

type IUserWithoutEmail = Required<Omit<IUser,"email">>

interface PageInfo{
    title:string;
}

type Page="home"|"about"|"contact";
type nav=Record<Page,PageInfo>
interface Todo{
    title:string;
    description:string;
}
type OptionalTodo=Partial<Todo>
type ReadOnlyTodo=Readonly<Todo>
type NonNummTodo=Required<OptionalTodo>
type T0=Extract<"a"|"b"|"c"|"f","a"|"f">;
type PartialWithNewmember={[P in keyof IUserWithoutEmail]:IUserWithoutEmail[P]}&{newmember:number}
let t:PartialWithNewmember={
    id:'',
    name:'',
    newmember:2
}


