import { Dropbox } from 'dropbox';

const ACCESS_TOKEN = 'sl.u.AFrSIl-Lh_EOMlBSuy6d9BRbIFj5cbMb5QwZAtgo1cmDXGSs9tzUJFS-J6gFvIc0d-BuZGxP86DlAkyiQEhpepSo7nORfvFfhXtkT3yJVn3BwziNoQp95kzkC76GYBPzBmN2ASiogu7JY5863JhbcbRHTxHBkAYbNDZGGiq0W_42qTHgzzllgDTLyA71hUgHxKEYZchcDyk27Px-6DK0VenyEL5yavWuRp42R4mdie0JJjQshVVUwiKoXOvfuLDFpuoi4SPEmHrCleo4zgzV-UmhISQ4s9iEHN70CeXmb-o3kaTgbIXdo3Me_55KONoHVBsPvKFRhBkFFGpdZPg-akpbdU2A3V_WjsTlM3Ja0zKYcKXNI2m_id9yNnrzCs0XV0OWvmBa6nHePmypI1UzqJd-zJBIUDdNMniZrgqkAe3aM3wsvptH7iohY9inp-hWDtYPahY6RS1kHRKkh0OPbDAY1JUcQi895QEb2wA77f3qrdNhZXBhSmbfS_wsnSqMKeRPmkZmnD5K7tv289DPezMsFEXU8b3CiFAlXLdmVVCMuFhj2JPxj20n9VVDJmTkj2vFQVOtn_nlbaPAinpaf25ux_XUSyCXVSqRpYmhD5Cxam6SwRjQO6r6b3GuPEIPvki5CDEvVh4pZuEJXbaAJ69ZqtaKiC_vvK5llU0zvApb8CwH5BmUujMDysOjoUnuK84MZiGfcxCUSVx2jBK_CcrIY-xijZCCB7b8x56o9cFqlvUXwSKFMSgRCr-Pid6dWdhm4YtqgJcS70mlUfMASLHDZNm4Lx_5cIfA6yJmqh3mkNuMDcu0MVX6BqRhHT6KM0bKv1QoaCpTNj8f8sX28r5pDMnzpgKAXzOb9hb5NfQeU95P0Bc74Aasj94Sjnn3GTAkYMBFfHRvoJoltCXHhxDUHdJ3Jtz71m6fQHxl7JmcTci7-kwXoqiVeS3zJTMhn08uATfsVjUn_iQDqKOcz6oK-PjMs8hhXjrlKT7XfjvRRLCp5180YwjGhEmSOMlmmnpoVM3Y1f3T55bUFtkHzJsT--YsOeHGvXtztW_4WjNzwdnzLMhj3v3-fpWRp3zhjS1nHb8RghBFBqX8EEJ1NIVqSfdCK--mamSQGrhuZNOU7L_U3oBgI0bc-SZeJpS43l3HF9Qxp5w42_vP6zKmtb2MGRpGH_fJD4nBtAWAQ9lACCpLk99OUhdvd5v9U5X5aEiDMxVhNlkFkvWkZgKi2T9UZ1qSEEr3IngNtdWQX9tkntj3X_8za379l6Ofls4Q3meTvjmRXGc8aXlw4v59nwhqZiMz7hEGPjjkKGXq83E04bLySdNiYsAMCRXKNI6nDVottzNUvh8zpetmWkF9c7ue7q82NpPUcdeKNFkF-Lujcj7jsoJIXoX4nHN5OV5ihwpmdC_jx3OGWwN5ded_hncMuSXEPj2wVie1zmRbbQ2hZhnAp5nOG4J4i-GWR_nszZE';

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
