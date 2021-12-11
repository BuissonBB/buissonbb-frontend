import SectionModel from "./SectionModel";

export default class CategoryModel {
    public id: number;
    public title: string;
    public icon: string;
    public description: string;
    public section: SectionModel;
}