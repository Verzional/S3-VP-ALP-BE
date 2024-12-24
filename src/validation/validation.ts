import { ZodType } from "zod"

export class Validation {
	static validate<T>(schema: ZodType, data: T): T {
		// konversi data otomatis menjadi tipe data yang diharapkan
		return schema.parse(data)
	}
}
