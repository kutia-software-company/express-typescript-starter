import { isEmpty } from 'class-validator'

export class RequestQueryParser {
    limit: number
    page: number
    sortByDesc: any
    sortByAsc: any
    relations: any
    filter: any

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

    parseFilters(): object {
        let filters = this.filter
        let parsedFilters: any = []

        for (let filter in filters) {
            let myObj = filters[filter]
            let value: any = null
            let operator: string = 'eq'
            let not: boolean = false
            let sqlOperator = null

            if (typeof myObj === 'string' || myObj instanceof String) {
                value = myObj
            }

            if (typeof myObj === 'object') {
                operator = Object.keys(myObj)[0]
                value = myObj[operator]
                if (typeof value === 'string' || value instanceof String) {
                    value = value
                } else {
                    operator = Object.keys(myObj)[0]
                    let operatorValues = myObj[operator]
                    let isNot = Object.keys(operatorValues)[0]
                    not = Boolean(isNot)
                    value = operatorValues[isNot]
                }
            }

            switch (operator) {
                // String contains
                case 'ct':
                    value = '%' + value + '%'
                    sqlOperator = (not) ? 'NOT LIKE' : 'LIKE'
                    break

                // Equals
                case 'eq':
                    value = value
                    sqlOperator = (not) ? 'NOT !=' : '='
                    break

                default:
                    break;
            }

            parsedFilters.push({ column: filter, operator: operator, sqlOperator: sqlOperator, not: not, value: value })
        }

        return parsedFilters
    }

    getAll(): { take: number, skip: number, order: object, relations: object, filters: object } {
        return {
            take: this.parseLimit(),
            skip: (this.getPage() > 0 ? this.getPage() - 1 : 0) * this.parseLimit(),
            order: this.parseSort(),
            relations: this.parseRelations(),
            filters: this.parseFilters()
        }
    }
}