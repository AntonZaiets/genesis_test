import { Dropbox } from 'dropbox';

//const ACCESS_TOKEN = 'sl.u.AFoCwU3BmGUcJAf4dqEI0WkCwL4adGrvw7ClyYLm6bomHeS5yjwTA36YLdqIFhUmwizcanA_SeFJOTfY606FiW11qXF13LPoCXZ4z5tVmng8C_Jdchh_r7fRPddQZ1tdIxfQ91KAmgXxdBXVWrYFlrxkKtTcJd3NO0nQNAqr-M3o6Yt8ZifFVO1W9SdqPfoTKJrMo3Iq4Xwtf59nEZoCIJoM0BGJ8K0RXTxU6qP9rq0ZEPbtdk5oeBf2vAg5lpWknc5UchgQvCGlsssnaL1sq-G1xncVeMEIIKlTZYxdbZPVN0tV277zmbA-FL-uGJZBgHrDA-imyfNe5hrxbPGLckpIhDP6iInMuBlkLR2u0ZuB5tUqGuEEUiyMPVPMBPsDnScYdnexgrNKU8Nrg5D1FZuOru6SUYHl3gBIQqef0AH2PvnaDQsP1_JHgA4Ah8E0jLrbf0-jVJBgZURYYd0hguIq8CYIErDJ1-Ke1-LDtuEYclL3cNsZ8O5zftSq4SCnsQXlwX25gAA8ST7o9pWYJ6aAyUBapo5DQ8lxSGz29s0pYahiDA6rDx9N6LR0WMhrjfeeTZoiziN8KuAXmMO-qRcx_hV0Hl6SxvkxJ6S0i-RTmVjgQrKOcS6G7uI1k08yzugLWt2fqNfHGGIrvG2MVUY4PvNYEGicbIvaNuX1a5x8idLyNXF6_6evXBUgVO4gpfTexZB8BbO_ElV6yiyGFuYMO5xsX_MwWNlZ3bLaP8fTca5ucqQ_k8Sxd1BbyuUd-0xen7YRCbbIQ6Y6wTuJd_wq7mcVn8ZbmpWZWA9Dh5NvGQcxd5hWDxCgPvE2NOxSkyVD8vAIAyllbsi-fFJAfNOxgcBZvhCBkv-3JG8GP8IS6dVcurBG9ToaBvXUnfHPNWdOwHKvFUXkL8PVGyIkGY2XOMgND_hQsZT2UOdrdzW9V7r1wDdA3Biw-zxXzKdS3Itmvi4xOIu2zV-aqpayjCsbdS77XJqunY5SwVtOKpvYeBPQRbHinNXoE0Hh38Fb72Q--pWL_eyPHLyx_Z1E3zAtZtXJ_UNmy3ZGN9g3WqhYXss_uMRLcKiJPBFGudbY9CJfAn2g122NI-3Xx-Swd0HCqbrJW_aQ65fagtyt1gtZzgVqtIF8aJMn6ZsoPr3VG_si8-i6wqt_qrcJr9gnilRA77d3aEEPJYyfGZlNxzhtF-4RhxsnGoMopJ-_Yf4EhEyTqZ3d7TbF3LKp6HUMPxf_mGHK1Ot3gju9q2sFl9KCha3hAuAupiDaGsAjoLmsz5lW4Fnocx3dB8VWXg9-jZrLxXJnsEC5uFDv8zEcLmIDL0or6v1Zn1GjY9CxteoaVw6PbH0Th-k8VpsLx8tQJXOkM-XNkiOVPNnZHdwKgHsd9RdUS-2B1L_qDB4uU4P1ArqDLRPs2cX6uKwjKyj2ZtHEgPI6wEA2bxKiP5KjfNpVQSgJArA5o2_5i0cHUvWFQ88';
const ACCESS_TOKEN = 'SHzwokALG_oAAAAAAAAALQaLzVxfMA86KqqezHqas5A';
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

