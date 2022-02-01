<h1>Kyanon NodeJS Entrance Test</h1>
 
Cách deploy code ở local machine<br />
  + Lệnh để tải thư viện và chạy ứng dụng<br />
    Bật git bash và tải project về bằng cách nhập câu lệnh sau:__
    `git clone https://github.com/Yosutta/Kyanon-Entrance-Test.git`__
  
    Sau khi tải project, cd vào thư mục "Kyanon-Entrance-Test"__
    Tải về và cập nhật các câu lệnh bằng câu lệnh__
    `npm install`__
  
    `tsc` để compile các file Typescript thành JS__
  
    Chạy chương trình bằng câu lệnh__
    `node src/app.js`__
  
    Trong cmd sẽ hiển thị câu lệnh 'Listening on port 8000'__
  
  + Port để test ứng dụng là 8000 tại localhost__
    * localhost:8000__
    * 127.0.0.1:8000__
  
  + Cách khởi tạo database__
  host: 'localhost'__
  port: '3306'__
  database: 'tododb'__
  Dữ liệu mẫu đã được export vào folder 'exported tododb sql'__
 
