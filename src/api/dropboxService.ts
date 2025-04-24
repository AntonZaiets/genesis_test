import { Dropbox } from 'dropbox';

const ACCESS_TOKEN = 'sl.u.AFoHqVXgQxmpx-iHNzHPa0CKJoiNfj4JFUy6JUTQ3F9Q-q0SdlUjkDEQ5RuGkxOslRH89oX-CPlctgIuud7KEJ51wxu0KE-c8cfpysGj0t_ck2jSxLfC7bE15MUcAqjAjlHBy_E-5xAaKgCEp-FVctTC7cgACjLSe2PqHXQq6RIJBZx4nAcC0i1VlIsKA7bt63J5gQCWLEleIczJuKCqwKG3isVzV5TDG0kVwoCTEJkIju5GFNQTfnW81BAI4lYj7AoraEY6Q7ncS54krJVmc5FqZkx6ufamAVds-floWbhumLOYLhra-sYIlVe_uyfMomxd1nBXprd8dAYwk4NuBTL7-lf3Zy9UHm23G0nv5UwfC4Pn1JGopKhMs7dhAgHwz7td0Y9olbdGhIYfE4JJH3GYEBm-uGt0DyGRm7QhuqwlAWx8I8fmQZDkfc0vMFsiNTvoDTRaMD2IV-yRKVRg5axSdtpPVz_-Ko3hktR5W3uKXr-9EQXBzrXmb2sUclK_S1n8b5GQXee1sfL8xpg57KXG5_GUQxL0jcaOd9X3gGj3Y4j-RWx7gmcKLrjrx0piPTRJw4H8l1rLubi0pwcwCKeI5Rnv_25Wlsah8CNzajr_cjHG6wAPRswGMszbJU1uabLittAEVQIaENbV9MlBwOhObmsV2ILTXo8lq5NSzAGwKHizG0F4O6JketsRii0Dvh_78aTPJATts8K0_LAIc6VCTkWERfbxdAd4fgQSYUugEQEcWZ2LDOOr6EwkihaNelrlZ1eWg9qzcALzD3eSGS8yyBebr0QGayxA4ieFaNbogleo6w18IXZa5ONpOPVmTHLsurrRlx0jTjVtFNIf-TSPhEsh4iJx1A561WVxAETQiupaV1-Ober-8yHIT_NiabHBhrDcLAAv93TEixVlDRPxs3fA57VLEHBcEatTcVPlZFEJqwi7zccOabV7Rzw-a2KeaE5pQj_53ouI6dvieXG2_BeSx-4eIvqX93QkQUBFzeaqkozNFeM--lhStCsa7TcEs0Wq1Dd1HseT9L44fI0RaUfaPVpYRtQ-sbsuw7bcPldCm9IAcz9HMOk5d4TGtGbqGaRswE6zMHEc3AcPuBx0ug05MDNwWDqeAvdFgunxlvvqTB6ALRAdG6ZEZjXMfkG1QQ2nevfYtJFsvaTg5OVi_YcVXqNpIMeCtQr02UJT0mNgJ63_VqMINizan6_WwZ_w54tm9VLczPjG6RbfOF1j2B3xMk-kh7xtVefDSUlyJvAi7KJRWZWeg7nhfEnudbuzs_i2qrfEpMpd9ttdFLxP-qi6jdjMMfvrg7-NDG6qxOQcb1Foq62gnwyARGXd3e8qzNplkt0qjbv62MOCmaC3ObByB8hBK9UZ62ckyEcE2yJZeH5TP-XgmfEoNeIknX_XV-i83KFmXkAaBDZVnkzkLyNwZ3Kcb7-97sB9fi2lzFqkXvGvtbWTDsFDGvnXwpw';

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
