import { isEmpty } from 'class-validator'

export class ResourceOptions {
    limit: number
    page: number
    sortByDesc: any
    sortByAsc: any
    relations: any

    parseLimit(): number {
        return Number(this.limit)
    }

    getPage(): number {
        return Number(this.page)
    }

    parseSort(): object {
        if (isEmpty(this.sortByDesc) && isEmpty(this.sortByAsc)) {
            return []
        }

        let list: any = {}

        if (!isEmpty(this.sortByDesc)) {
            let sortByDesc = this.sortByDesc.split(',')

            sortByDesc.forEach((field: string) => {
                list[field] = 'DESC'
            })
        }

        if (!isEmpty(this.sortByAsc)) {
            let sortByAsc = this.sortByAsc.split(',')

            sortByAsc.forEach((field: string) => {
                list[field] = 'ASC'
            })
        }

        return list
    }

    parseRelations(): object {
        if (isEmpty(this.relations) && isEmpty(this.relations)) {
            return []
        }
        
        return this.relations.split(',')
    }

    getAll(): object {
        return {
            take: this.parseLimit(),
            skip: (this.getPage() > 0 ? this.getPage() - 1 : 0) * this.parseLimit(),
            order: this.parseSort(),
            relations: this.parseRelations()
        }
    }
}