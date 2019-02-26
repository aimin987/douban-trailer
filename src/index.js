import './assets/common.sass';

function changeTitle() {
    window.$('#app').html('Parcel 打包包');
}

setTimeout(() => {
    changeTitle();
}, 2000);