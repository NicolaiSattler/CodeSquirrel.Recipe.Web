export interface INecessity
{
    UniqueID: string;
    Name: string;
    Description: string;
    Electrical: boolean;
}

export class Necessity implements INecessity
{
    private _uniqueID: string;
    private _name: string;
    private _description: string;
    private _electrical: boolean;

    constructor() {}

    public get UniqueID(): string {
        return this._uniqueID;
    }
    public set UniqueID(v: string) {
        this._uniqueID = v;
    }
    public get Name(): string {
        return this._name;
    }
    public set Name(v: string) {
        this._name = v;
    }
    public get Description() {
        return this._description;
    }
    public set Description(v: string) {
        this._description = v;
    }
    public get Electrical(): boolean {
        return this._electrical;
    }
    public set Electrical(v: boolean) {
        this._electrical = v;
    }
}
