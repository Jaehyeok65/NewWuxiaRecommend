import React, { useEffect, useState } from 'react';
import { API } from 'api/LoginAPI';
import axios from 'axios';
import FileResizer from 'react-image-file-resizer';

const Test = () => {
    const [image, setImage] = useState<any>(null);
    const [fileName, setFileName] = useState<any>(null);

    const onImageHandler = async (e: any) => {
        const file = await e.target.files[0]; //사용자가 업로드한 이미지를 비동기적으로 가져온다.
        console.log('imgae incoding before : ', file);
        const newFileName =
            file.name.split('.').slice(0, -1).join('') + '.webp';
        console.log(newFileName);
        const suppertedFormats = ['image/jpeg', 'image/png', 'image/svg+xml']; //허용한 이미지 형식 정의
        if (!e.target.files[0]) {
            //만약 업로드한 이미지가 존재하지 않는다면 함수를 종료
            return;
        }
        if (!suppertedFormats.includes(file.type)) {
            //업로드한 이미지가 정의된 형식에 맞지 않는다면 경고창 띄우기
            alert(
                '지원되지 않은 이미지 형식입니다. JPEG, PNG형식의 이미지를 업로드해주세요.'
            );
            return;
        }
        try {
            const compressedFile: any = await resizeFile(e.target.files[0]); //"resizeFile"함수를 통해서 업로드한 이미지 리사이징 및 인코딩
            console.log('imgae incoding after : ', compressedFile);
            const previewUrl = URL.createObjectURL(compressedFile);
            setImage(previewUrl); // 리사이징된 이미지 설정
        } catch (error) {
            //리사이징에 실패했을시 console에 출력하게 한다.
            console.log('file resizing failed');
        }
    };

    const resizeFile = (file : Blob)  =>
        new Promise((resolve) => {
            //비동기 작업을 위해서 "Promise"를 통한 비동기 작업 정의
            FileResizer.imageFileResizer(
                //Resizer의 "imageFileResize"메서드를 통해서 이미지 리사이징 및 인코딩 옵션 정의
                file,
                1000, //이미지 너비
                1000, //이미지 높이
                'WEBP', //파일 형식
                100,
                0 /* rotation */,
                (uri) => {
                    /* resize new image with url*/
                    resolve(uri);
                },
                'blob' /* output Type */ //"blob"으로 정의할 수 있다.
            );
        });

    return (
        <>
            <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={onImageHandler}
            />
            {image && <img src={image} alt="Resized Image" />}
        </>
    );
};

export default React.memo(Test);
