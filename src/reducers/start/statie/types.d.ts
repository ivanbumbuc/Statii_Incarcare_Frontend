interface IStatie {
    name:string;
}
type StatieState = {
    statie:IStatie
}

type StatieAction = {
    type: string;
    data: IStatie;
}

type ActionTypeStatie = StatieAction;
type DispatchStatieType = (args: ActionTypeStatie) => ActionTypeStatie;