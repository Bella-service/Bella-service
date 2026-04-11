// اليوم والتاريخ الميلادي تلقائي
const today = new Date();

const days = ["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];

document.getElementById("dayName").innerText = days[today.getDay()];
document.getElementById("todayDate").innerText = today.toISOString().split("T")[0];


// توليد أرقام 0 → 200
function numbers(max){
  let opt = "";
  for(let i=0;i<=max;i++){
    opt+= `<option value="${i}">${i}</option>`;
  }
  return opt;
}


// صف الموظفين (ما لمسناه)
function staffRow(){
  return `
  <tr>
    <td>
      <select>
        <option value="">اختر</option>
        <option>مشرفة عامة</option>
        <option>مشرفة عبايات</option>
        <option>مشرفة جوالات</option>
        <option>قهوجية / قهوجي</option>
        <option>مساعد القهوجية</option>
        <option>صباب / صبابات</option>
        <option>عاملة نظافة</option>
        <option>عمال تقديم الخدمة</option>
      </select>
    </td>
    <td>
      <select>${numbers(200)}</select>
    </td>
    <td><input type="text"></td>
  </tr>`;
}


// صف الخدمات (هذا اللي عدلناه فقط)
function serviceRow(){
  return `
  <tr>
    <td>
      <div class="item-combo">
        <select onchange="fillItem(this)">
          <option value=""></option>
          <option value="مشرفة عامة">مشرفة عامة</option>
          <option value="مشرفة عبايات">مشرفة عبايات</option>
          <option value="مشرفة جوالات">مشرفة جوالات</option>
          <option value="قهوجية / قهوجي">قهوجية / قهوجي</option>
          <option value="مساعد القهوجية">مساعد القهوجية</option>
          <option value="صباب / صبابات">صباب / صبابات</option>
          <option value="عاملة نظافة">عاملة نظافة</option>
          <option value="عمال تقديم الخدمة">عمال تقديم الخدمة</option>
        </select>

        <input type="text" class="item-input" placeholder="اختر أو اكتب الصنف">
      </div>
    </td>

    <td>
      <select>${numbers(200)}</select>
    </td>

    <td><input type="text"></td>
  </tr>`;
}


// تعبئة الصنف عند الاختيار
function fillItem(selectEl){
  const row = selectEl.closest("tr");
  const input = row.querySelector(".item-input");

  if (selectEl.value) {
    input.value = selectEl.value;
  }
}


// إضافة 10 صفوف
for(let i=0;i<10;i++){
  staffTable.innerHTML += staffRow();
  insideTable.innerHTML += serviceRow();
  outsideTable.innerHTML += serviceRow();
}


// حذف الصفوف الفاضية وقت الطباعة
function cleanTable(tableId){
  const table = document.getElementById(tableId);
  const rows = Array.from(table.rows).slice(1);

  rows.forEach(row => {

    let typeField = row.cells[0].querySelector("select, input");
    let numberField = row.cells[1].querySelector("select");

    let typeValue = typeField.value.trim();
    let numberValue = numberField.value;

    if (typeValue === "" || numberValue === "0") {
      row.remove();
    }
  });
}


// الطباعة
function prepareAndPrint(){
  cleanTable("staffTable");
  cleanTable("insideTable");
  cleanTable("outsideTable");

  window.print();
}
