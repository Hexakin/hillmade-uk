// No filesystem imports: site metadata is also imported by client navigation.
export const localPreview = () => process.env.LOCAL_CONTENT_PREVIEW === "1" && !process.env.VERCEL;
