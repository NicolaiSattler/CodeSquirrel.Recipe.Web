export class Product implements IProduct {
    private _uniqueID: string;
    private _name: string;
    private _type: number;
    private _perishable: boolean;
    private _deleted: boolean;
    private _modified: boolean;

    public get UniqueID(): string {
        return this._uniqueID;
    }
    public get Name(): string {
        return this._name;
    }
    public set Name(value: string) {
        this._name = value;
    }
    public get Type(): number {
        return this._type;
    }
    public set Type(value: number) {
        this._type = value;
    }
    public get Perishable(): boolean {
        return this._perishable;
    }
    public set Perishable(value: boolean) {
        this._perishable = value;
    }

    constructor() { }
}

export interface IProduct {
    UniqueID: string;
    Name: string;
    Type: number;
    Perishable: boolean;
}
