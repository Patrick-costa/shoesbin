import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }


  bucket = new S3(
    {
      accessKeyId: `${environment.accessKeyId}`,
      secretAccessKey: `${environment.secretAccessKey}`,
      region: 'sa-east-1',
    }
  )

  fileUpload(file: any, fileName: string) {
    const contentType = file.type;
    let name = fileName.split("https://shoesbin.s3.sa-east-1.amazonaws.com/")
    const params = {
    Bucket: 'shoesbin',
    Key: name[1],
    Body: file,
    ACL: 'public-read',
    ContentType: contentType
    };
    this.bucket.upload(params, function (err: any, data: any) {
    if (err) {
    console.log('EROOR: ',JSON.stringify( err));
    return false;
    }
    console.log('File Uploaded.', data);
    return true;
    });
    }
}
