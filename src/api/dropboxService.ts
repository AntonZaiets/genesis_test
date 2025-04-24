import { Dropbox } from 'dropbox';

const ACCESS_TOKEN = 'sl.u.AFqHGPFTtqlHfsgErDF33cVL8Qa0zJOOQeZsJQMzbB7se2Zvohcs-ZtqEctxdohg8_Cf-VcMI53zARijIAfUyW-vru0Tms6yaBsCo7Z5cBBVKpR_KNjwfAdZOkAoV2rMJ7VKO3NTc1Mnd3SCUstLIoCRSroJGxteygk0Icn3mfIALFaTR_K5XB09jCmYyeB4Loi3uqf_lIuH34bYiQlNEwWfSm90R3QRzo6rFMyuTWF6xOmqaGuGPnM_D9_NK-p9m05hyVO3m74AYU96pfpbkvNUya2qyBggAk32PkSNDqTgxZvPtUAaXndxZ3w2N7nOmH0KwtG8jwUwaFaVdXSGYLH2gjvUJWM0V2NisWFAcq31iPyGvq7LF1NchNDbONVv3exJupKevWxBeInqIfq6HCYPPsgXK6wr5xjyznQ5qJjCCTUPj1FosYfHHdls02EvkHZzQJ45THabNu8OfyHeHC-iWSK8AbkoJzOXZwP9gj2lCupvhC7A8WwvkVT7YSF5D60qRK9s0JCJhGI3Q9Ynomt1GgpSN6wRpIOWy36kcgJin4l00CVvpnhKeHLrT1QGwzKLrTWDJ5v33NDTzepO0rmjk9vsXLkaOjxh0PP9EhtzMoSs3gruYYalHtk0CYDYCYWpD29SXF9SUebJRTt7fg3gGWBDAqv8ao2-yzcfL3WS88pIVJbxo6UAGAVi4-Z_fm-FeX52u6JVPs_58GHD9kVWYL_cn4pUU1z3F4Pr7UB1NzoXRvqLMQS54zxFJwGnorjhkbCT5rTk85vvk493TQDyzRuoc0xYnFN9umsUANNDcQndKKdkU6fnSVHtmqeDOdhT1xpjgAgYmJfPbnJeueRmSAHZI0jAo5WwVVKUhNvO63nMzOyDCmPUGezyEDcSxQv2Hxbz4ZLWLo-T6jBjcjZzYcFe9jRoMV_naOEORK8J8g_S1YNnnG_zoNQXN3tZyUwVRVYPLKtmSNiLsDxQ59f0S-LDyHJeypI8P_LFjFS5JUxjiM-6PwR2vyCYUcPCjmliLD1BF1sT9dLCx4SVq_v750Lr7ZK1lrVKgb8HgCTMiicU-i41MTwT4-REQSt81B2JHil4gvXksj_pL-e1MwGg9lQKpyxiwAm6Y4XoXWr3v-RVMsB9XTlIhkGLJfvG6-sZpKP4hhJV5wnInF3ZhJdxLu8QtQz6zC5Ef8JH5QRarMp7rYQf_k0DH7cVD1XPMDP4MbLBvpwYOemF6ArccgZjEU8CmTEk4ArEMbWCGk88Q5Y5cDe58pKh43zs8i9bwQNeb7cbWqO04e62TkgqzR8YFb5KP5qWs3Kq_VrWUPbPW04-Kkfw0PiyMUxVTrxbZllO-iyXxsRhBXRkZ3rud1P5X7jIHomj1iVxpfEjiRVXxQeK6ZHfa0nqNBIrh9N2cbLxQ2WgSyBAXA9ltVJVusma-z9tFDMAsEg1POg8bJqOOxJ3cblQtDX2vkED-htePuk';

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
