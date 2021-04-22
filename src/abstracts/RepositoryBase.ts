import { Brackets, Repository, SelectQueryBuilder } from 'typeorm'

export abstract class RepositoryBase<T> extends Repository<T>  {
    public async getOne(resourceOptions?: object) {
        const alias: string = (<any>this).constructor.name
        const queryBuilder = this.createQueryBuilder(alias)

        this.applyResourceOptions(alias, resourceOptions, queryBuilder)

        return queryBuilder.getOne()
    }

    public async getOneById(id: number, resourceOptions?: object) {
        const alias: string = (<any>this).constructor.name
        const queryBuilder = this.createQueryBuilder(alias)

        this.applyResourceOptions(alias, resourceOptions, queryBuilder)

        queryBuilder.where(`${alias}.id = :id`, { id: id })

        return queryBuilder.getOne()
    }

    public async getManyAndCount(resourceOptions?: object) {
        const alias: string = (<any>this).constructor.name

        const queryBuilder = this.createQueryBuilder(alias)

        this.applyResourceOptions(alias, resourceOptions, queryBuilder)

        return queryBuilder.getManyAndCount().then((result) => {
            return {
                'total_data': result[1],
                'rows': result[0]
            }
        })
    }

    protected applyResourceOptions(alias: string, options: any, queryBuilder: SelectQueryBuilder<any>) {
        if (!options) {
            return
        }

        if (options.take) {
            queryBuilder.take(options.take)
        }

        if (options.skip) {
            queryBuilder.offset(options.skip)
        }

        if (options.relations) {
            options.relations.forEach((element: any) => {
                let splitedElement = element.split('.')
                let newAlias = ''
                let fullRelation = ''

                for (let index = 0; index < splitedElement.length; index++) {
                    if (index == 0) {
                        newAlias = alias
                    }

                    fullRelation = newAlias + '.' + splitedElement[index]
                    newAlias = newAlias + '_' + splitedElement[index]

                    queryBuilder.leftJoinAndSelect(fullRelation, newAlias)
                }
            })
        }

        if (options.filters) {
            queryBuilder.where(new Brackets(qb => {
                for (let index = 0; index < options.filters.length; index++) {
                    const element = options.filters[index]
                    var elementSplited = element.column.split(/\.(?=[^\.]+$)/)
                    let sqlOperator = element.sqlOperator
                    let whatToFilter = ''

                    if (!element.column.includes('.')) {
                        whatToFilter = alias + '.' + element.column
                    } else {
                        whatToFilter = alias + '_' + elementSplited[0].split('.').join('_') + '.' + elementSplited[1]
                    }

                    if (index == 0) {
                        qb.where(`${whatToFilter} ${sqlOperator} :value` + index, { ['value' + index]: element.value })
                    } else {
                        qb.andWhere(`${whatToFilter} ${sqlOperator} :value` + index, { ['value' + index]: element.value })
                    }
                }
            }))
        }

        return queryBuilder
    }
}
