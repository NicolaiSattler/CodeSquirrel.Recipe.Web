export class Product implements IProduct {
    private _uniqueID: string;
    private _name : string;
    private _type : ProductType;
    private _perishable: boolean;
    private _deleted: boolean;
    private _modified: boolean;

    public get UniqueID(): string {
        return this._uniqueID;
    }
    public get Name(): string{
        return this._name;
    }
    public set Name(value: string){
        this._name = value;
    }
    public get Type(): ProductType{
        return this._type;
    }
    public set Type(value: ProductType){
        this._type = value;
    }
    public get TypeFlag(): string {
        return ProductType[this._type];
    }
    public get Perishable(): boolean{
        return this._perishable;
    }
    public set Perishable(value: boolean){
        this._perishable = value;
    }

    constructor() {
        
    }
}

export interface IProduct {
    UniqueID: string;
    Name : string;
    Type : ProductType;
    Perishable : boolean;
}

enum ProductType {
    Undefined = 0,
    Grains = 1,
    Fruit = 2,
    Dairy = 3,
    Vegetable = 4,
    Meat = 5,
    Fish = 6,
    Snack = 7,
    NonAlcaholicDrink = 8,
    AlcaholicDrink = 9,
    Potatoes = 10,
    Vegetables = 11,
    HerbsAndSpices = 12,
    NutsAndSeeds = 13,
    Oil = 14,
    Soya = 15,
    Sugar = 16,
    Sauces = 17,
    Pet = 50,
    HouseHold = 75,
    Extra = 100
}