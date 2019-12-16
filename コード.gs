// ユーザのGmail：表示させたい名称
var users = {"AAAAAAAA@gmail.com":"A",
             "BBBBBBBB@gmail.com":"B",
             "CCCCCCCC@gmail.com":"C",
             "DDDDDDDD@gmail.com":"D"};

// 本当は画像で表示させたいが、IMAGE関数がブランク認定されるため断念
// var users = {"******": '=IMAGE("******")'};

// イイねボタン
function pushGood(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var objSheet = ss.getActiveSheet();
  var objCell = objSheet.getActiveCell();
  var ranges = objSheet.getRange("H" + objCell.getRow() + ":" + "S" + objCell.getRow());
  var values = ranges.getValues();
  
  // ボタンを押したユーザを取得
  var m = GetUser();
  
  var count = 0;
  try {
    for(i = 0; i <= values[0].length -1; i++ ){
      if (count >= 3){
        break;
      }
      if(values[0][i] == null || values[0][i] == "" ){
        values[0].splice(i, 1,users[m]);
        break;
      }
      else if(values[0][i] === users[m]){
        count++;
      }
    }
    ranges.clearContent().setValues(values);
  }
  catch (e) {
   result = "エラーの内容:" + e;
   Logger.log(result);
  }
}

// イイね取消ボタン
function pushNoGood(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var objSheet = ss.getActiveSheet();
  var objCell = objSheet.getActiveCell();
  var ranges = objSheet.getRange("H" + objCell.getRow() + ":" + "S" + objCell.getRow());
  var values = ranges.getValues();
  // ボタンを押したユーザを取得
  var m = GetUser();
  
  try {
    for(i = values[0].length - 1; i >= 0; i-- ){
      if(values[0][i] == users[m] ){
        values[0].splice(i, 1);
        values[0].push('');
        break;
      }
    }
    ranges.clearContent().setValues(values);
  }
  catch (e) {
   result = "エラーの内容:" + e;
   Logger.log(result);
  }
}

// マクロを実行したユーザーの情報を取得する
function GetUser() {
  var objUser = Session.getActiveUser();
  Logger.log(Session.getActiveUser());
  return objUser;
}