import { isEmpty } from 'class-validator'

export class ResourceOptions {
    limit: number
    page: number
    sortByDesc: any
    sortByAsc: any

    parseLimit(): number {
        return Number(this.limit)
    }

    getPage(): number {
        return Number(this.page)
    }

    parseSort(): any[] {
        if (isEmpty(this.sortByDesc) && isEmpty(this.sortByAsc)) {
            return []
        }

        let list: any[] = []

        if (!isEmpty(this.sortByDesc)) {
            let sortByDesc = this.sortByDesc.split(',')

            sortByDesc.forEach((field: string) => {
                list.push([field, 'DESC'])
            })
        }

        if (!isEmpty(this.sortByAsc)) {
            let sortByAsc = this.sortByAsc.split(',')

            sortByAsc.forEach((field: string) => {
                list.push([field, 'ASC'])
            })
        }

        return list
    }

    getAll(): object {
        return {
            limit: this.parseLimit(),
            offset: (this.getPage() > 0 ? this.getPage() - 1 : 0) * this.parseLimit(),
            order: (this.parseSort().length) ? this.parseSort() : []
        }
    }
}