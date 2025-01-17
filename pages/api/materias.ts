import { connectToDatabase } from "../../util/mongodb"
import type { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDatabase()

    const materias = await db.collection("materias").find({}).sort({ data: -1 }).toArray()
    res.json(materias)
}