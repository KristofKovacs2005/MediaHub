interface ITag {
    t_id: number,
    t_name: string
}

class Tag implements ITag {
    t_id: number
    t_name: string

    constructor(init: ITag) {
        this.t_id = init.t_id
        this.t_name = init.t_name
    }
}

export default Tag;