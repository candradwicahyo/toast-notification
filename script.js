window.addEventListener('DOMContentLoaded', () => {
  
  const content = document.querySelector('.content');
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // ambil isi dari atribut "data-type" dari tombol yang ditekan
      const type = this.dataset.type.toLowerCase();
      // jalankan fungsi toastNotification();
      toastNotification(type);
    });
  });
  
  function getTypeNotification(param) {
    // jika isi parameter "param" bertuliskan kata "success"
    if (param == 'success') {
      return {
        icon: 'fa-check',
        iconType: 'icon-success',
        bar: 'bar-success',
        text: 'this is success notification'
      };
    }
    // jika isi parameter "param" bertuliskan kata "danger"
    if (param == 'danger') {
      return {
        icon: 'fa-trash-alt',
        iconType: 'icon-danger',
        bar: 'bar-danger',
        text: 'this is danger notification'
      };
    }
    // jika isi parameter "param" bertuliskan kata "warning"
    if (param == 'warning') {
      return {
        icon: 'fa-pen',
        iconType: 'icon-warning',
        bar: 'bar-warning',
        text: 'this is warning notification'
      };
    }
    // jika isi parameter "param" bertuliskan kata "info"
    if (param == 'info') {
      return {
        icon: 'fa-eye-slash',
        iconType: 'icon-info',
        bar: 'bar-info',
        text: 'this is info notification'
      };
    }
    // jika isi parameter "param" bertuliskan selain kata success, danger, warning dan info
    return false;
  }
  
  function toastNotification(type) {
    // dapatkan spesifikasi notifikasi sesuai isi parameter "type"
    const getType = getTypeNotification(type.toLowerCase());
    // render isi variabel "getType" menjadi sebuah element HTML
    const result = renderElement(getType);
    // tampilkan element tersebut ke bagian halaman
    content.appendChild(result);
  }
  
  function renderElement({icon, iconType, bar: barType, text}) {
    const box = create('div', 'box');
    const boxContent = create('div', 'box-content');
    
    const wrapper = create('div', 'wrapper');
    const i = create('i', `fa-solid ${icon} icon ${iconType}`);
    const span = create('span', 'text', text, true);
    
    // ketika tombol close ditekan, maka hapus element "box"
    const btnClose = create('span', 'btn-close', '×', true);
    btnClose.addEventListener('click', () => box.remove());
    
    // jalankan fungsi barLoaderAnimation()
    const bar = create('div', `bar ${barType}`);
    bar.setAttribute('data-limit', 20);
    barLoaderAnimation(box, bar);
    
    wrapper.appendChild(i);
    wrapper.appendChild(span);
    
    boxContent.appendChild(wrapper);
    boxContent.appendChild(btnClose);
    
    box.appendChild(boxContent);
    box.appendChild(bar);
    
    return box;
  }
  
  function create(name, classname, value, show = false) {
    // buat element sesuai isi parameter "name"
    const element = document.createElement(name);
    /*
      jika parameter "classname" tidak berisikan apapun
      maka berikan sebuah class berupa string kosong. tapi apabila
      parameter "classname" berisikan sesuatu, maka jadikan isi parameter "classname"
      sebagai class untuk element yang sedang dibuat
    */
    element.className = !classname ? '' : classname;
    // jika parameter "show" berisikan boolean true
    if (show == true) {
      // tambahkan value atau teks pada element yang dibuat
      element.textContent = value;
      // kembalikan nilai berupa element HTML dengan value atau teks
      return element;
    }
    // kembalikan nilai berupa element HTML tanpa value
    return element;
  }
  
  function barLoaderAnimation(box, bar) {
    // buat variabel interval dan variabel number yang berisikan integer
    let interval, number = 100;
    // ubah lebar element "bar" sesuai isi variabel "number"
    bar.style.width = number + '%';
    // dapatkan isi atribut "data-limit" dari element "bar"
    const limit = bar.dataset.limit;
    // jalankan fungsi setInterval()
    interval = setInterval(() => {
      // kurangi isi variabel "number" saat fungsi setInterval() dijalankan
      number--;
      // ubah lebar element "bar" saat fungsi setInterval() berjalan
      bar.style.width = number + '%';
      // jika isi variabel "number" sudah mencapai angka 0
      if (number == 0) {
        // hapus atau hentikan fungsi setInterval()
        clearInterval(interval);
        // hapus element "box"
        box.remove();
      }
    }, limit);
  }
  
});