import { Dropbox } from 'dropbox';

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

const dbx = new Dropbox({ accessToken: ACCESS_TOKEN });

export const uploadFile = async (file: File, path: string) => {
    const contents = await file.arrayBuffer();
    const res = await dbx.filesUpload({
        path: `/${path}`,
        contents,
        mode: 'overwrite',
    });
    return res;
};

export const deleteFile = async (path: string) => {
    const res = await dbx.filesDeleteV2({ path: `/${path}` });
    return res;
};

export const getTemporaryLink = async (path: string) => {
    const res = await dbx.filesGetTemporaryLink({ path: `/${path}` });
    return res.result.link;
};

