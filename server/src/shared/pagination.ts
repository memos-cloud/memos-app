export const pagination = (req: any) => {
  return {
    take: Number(req.query.take || 10),
    skip: Number(req.query.skip),
  }
}
