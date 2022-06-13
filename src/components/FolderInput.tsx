import { ChangeEvent } from 'react';
import { IFolderInputProps } from '../Types/AppTypes';

const FolderInput = (props: IFolderInputProps) => {
    const changeUploadedFiles = (
        event: ChangeEvent<HTMLInputElement>,
        uploadedFileType: string
    ) => {
        props.setUploadedFiles({
            ...props.uploadedFiles,
            [uploadedFileType]: event.target.files?.[0],
        });
    };

    return (
        <>
            <div>
                <label> BIOMES </label>
                <input
                    className='folder-input'
                    type='file'
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        changeUploadedFiles(event, 'biomes')
                    }
                    accept={'image/png'}
                    multiple
                />
            </div>
            <div>
                <label> PREFABS </label>
                <input
                    className='folder-input'
                    type='file'
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        changeUploadedFiles(event, 'prefabs')
                    }
                    accept={'.xml'}
                    multiple
                />
            </div>
            <div>
                <label> SPAWN POINTS </label>
                <input
                    className='folder-input'
                    type='file'
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        changeUploadedFiles(event, 'spawnpoints')
                    }
                    accept={'.xml'}
                    multiple
                />
            </div>
            <div>
                <label> Map Info </label>
                <input
                    className='folder-input'
                    type='file'
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        changeUploadedFiles(event, 'mapinfo')
                    }
                    accept={'.xml'}
                    multiple
                />
            </div>
        </>
    );
};

export default FolderInput;
