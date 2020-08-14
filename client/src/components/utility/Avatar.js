import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const Avatar = (props) => {
  const shopper=true;
  const store_owner=false;
  const store=false;
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: props.profile.pk,
      status: 'done',
      url: 'https://uwe-repository.worktribe.com/img/user.svg',
    },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    console.log(props.profile.sk)
    setFileList(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotate>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        
      >
        {fileList.length < 1 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

export default Avatar;
