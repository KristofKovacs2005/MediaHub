interface ITag {
    t_id: number;
    t_name: string;
}
declare class Tag implements ITag {
    t_id: number;
    t_name: string;
    constructor(init: ITag);
}
export default Tag;
