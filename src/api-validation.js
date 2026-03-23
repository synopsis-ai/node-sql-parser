import { z } from 'zod'

function formatIssues(zodError) {
  return zodError.issues.map(i => i.message).join('; ')
}

/**
 * Parse external/public API input; throws TypeError with a clear message on failure.
 */
export function assertPublic(name, schema, value) {
  const result = schema.safeParse(value)
  if (!result.success) {
    throw new TypeError(`node-sql-parser: invalid ${name}: ${formatIssues(result.error)}`)
  }
  return result.data
}

export const sqlString = z.string()

const parseOptionsShape = z.looseObject({
  includeLocations : z.boolean().optional(),
})

export const parserOption = z.looseObject({
  database     : z.string().optional(),
  type         : z.string().optional(),
  trimQuery    : z.boolean().optional(),
  parseOptions : parseOptionsShape.optional(),
})

export const whiteListArg = z.array(z.string()).optional().nullable()

export const astSqlifyInput = z.union([z.looseObject({}), z.array(z.unknown())])

export const columnsToSqlColumns = z
  .union([z.array(z.unknown()), z.literal('*'), z.literal('')])
  .optional()
  .nullable()

export const tablesArg = z.unknown().optional().nullable()

/** Expression AST object, or a string passed through to literal handling (see exprToSQL). */
export const exprSqlifyInput = z.union([
  z.looseObject({}),
  z.string(),
  z.null(),
  z.undefined(),
])

export const createValueExprInput = z.union([
  z.array(z.unknown()),
  z.boolean(),
  z.string(),
  z.number(),
  z.null(),
])

/** Table/column identifier fragment (nullable / optional). */
export const identNullable = z.union([z.string(), z.null(), z.undefined()])

export const keywordString = z.string()

export const topToSqlOpt = z.object({
  value       : z.union([z.string(), z.number()]),
  percent     : z.string().optional().nullable(),
  parentheses : z.boolean().optional().nullable(),
}).passthrough().optional().nullable()

export const paramsRecord = z.record(z.string(), z.unknown())

export const looseAst = z.looseObject({})

export const optionalLooseObject = z.looseObject({}).optional().nullable()

export const eventList = z.array(z.looseObject({
  keyword : z.string(),
}))

export const columnOrderList = z.array(z.looseObject({}))

export const columnOrderListArg = z.union([columnOrderList, z.null(), z.undefined()])

export const autoIncrementInput = z.union([
  z.string(),
  z.looseObject({}),
  z.null(),
  z.undefined(),
])
