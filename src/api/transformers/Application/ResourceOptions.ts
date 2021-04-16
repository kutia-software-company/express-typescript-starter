import { isEmpty } from 'class-validator'
import { Between, Equal, In, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not } from 'typeorm'

export class ResourceOptions {
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
        let parsedFilters: any = {}

        for (let filter in filters) {
            let myObj = filters[filter]
            let value: any = null
            let operator: string = 'eq'
            let not: boolean = false
            let filterValue = null

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
                    filterValue = (not) ? Not(Like(value)) : Like(value)
                    break

                // Starts with
                case 'sw':
                    value = value + '%'
                    filterValue = (not) ? Not(Like(value)) : Like(value)
                    break

                // Ends with
                case 'ew':
                    value = '%' + value
                    filterValue = (not) ? Not(Like(value)) : Like(value)
                    break

                // Equals
                case 'eq':
                    filterValue = (not) ? Not(Equal(value)) : Equal(value)
                    break

                // Greater than
                case 'gt':
                    filterValue = (not) ? Not(MoreThan(Number(value))) : MoreThan(Number(value))
                    break

                // Greater than or equalTo
                case 'gte':
                    filterValue = (not) ? Not(MoreThanOrEqual(Number(value))) : MoreThanOrEqual(Number(value))
                    break

                // Lesser than or equalTo
                case 'lte':
                    filterValue = (not) ? Not(LessThanOrEqual(Number(value))) : LessThanOrEqual(Number(value))
                    break

                // Lesser than
                case 'lt':
                    filterValue = (not) ? Not(LessThan(Number(value))) : LessThan(Number(value))
                    break

                // In array
                case 'in':
                    filterValue = (not) ? Not(In(value.split(','))) : In(value.split(','))
                    break

                // Between
                case 'bt':
                    let firstValue = (value.split(',')[0])
                    let secondValue = (value.split(',')[1])
                    filterValue = (not) ? Not(Between(firstValue, secondValue)) : Between(firstValue, secondValue)
                    break

                default:
                    break;
            }

            parsedFilters[filter] = filterValue
        }

        return parsedFilters
    }

    getAll(): object {
        return {
            take: this.parseLimit(),
            skip: (this.getPage() > 0 ? this.getPage() - 1 : 0) * this.parseLimit(),
            order: this.parseSort(),
            relations: this.parseRelations(),
            filters: this.parseFilters()
        }
    }
}