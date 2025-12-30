import * as zod from 'zod';
import { isAddress } from 'viem'

export const zodValidate = (schema, value) => {
    const result = schema.safeParse(value);
    return result.success ? '' : (result.error.issues[0].message ?? 'Invalid value');
}

export const isEvmAddress = zod.string().refine((value) => isAddress(value), { message: 'Not EVM address'});
export const isNumber = zod.coerce
    .number({message: 'Must be a number'})
    .nonnegative({message: 'Must be 0 or higher'});