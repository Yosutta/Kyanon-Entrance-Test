<h1>Kyanon NodeJS Entrance Test</h1>
 
Cách deploy code ở local machine<br />
  + Lệnh để tải thư viện và chạy ứng dụng<br />
    Bật git bash và tải project về bằng cách nhập câu lệnh sau:<br />
    `git clone https://github.com/Yosutta/Kyanon-Entrance-Test.git`<br />
  
    Sau khi tải project, cd vào thư mục "Kyanon-Entrance-Test"<br />
    Tải về và cập nhật các câu lệnh bằng câu lện<br />
    `npm install`<br />
  
    `tsc` để compile các file Typescript thành JS<br />
  
    Chạy chương trình bằng câu lệnh<br />
    `node src/app.js`<br />
  
    Trong cmd sẽ hiển thị câu lệnh 'Listening on port 8000'<br />
  
  + Port để test ứng dụng là 8000 tại localhost<br />
    * localhost:8000<br />
    * 127.0.0.1:8000<br />
  
  + Cách khởi tạo database<br />
  host: 'localhost'<br />
  port: '3306'<br />
  database: 'tododb'<br />
  Dữ liệu mẫu đã được export vào folder 'exported tododb sql'<br />
 
