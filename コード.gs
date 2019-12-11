var users = {"***": '***'};

function pushGood(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var objSheet = ss.getActiveSheet();
  var objCell = objSheet.getActiveCell();
 
  var range = objSheet.getRange("G" +objCell.getRow() );
  //Logger.log("範囲 : " +  range.getNumColumns());
  
  var m = GetUser();

  Logger.log(users[m]);  
  //objCell.setValue(m);
  //Logger.log(objCell.isBlank());
  
  var count=0;

  for(var i = 0; i < 12; i++) {
    
    // 一人3いいねまで
    if (count >= 3){
      break;
    }
    
    // 空欄だったら名前を持ってくる
    if (range.offset(0, i).isBlank()){
      Logger.log(range.offset(0, i).isBlank());
      range.offset(0, i).setValue(users[m]);
      break;
    }
    else if(range.offset(0, i).getValue() === users[m]){
      Logger.log(range.offset(0, i).getValue());
      Logger.log("users[m]＝"+users[m]);
      count++;
    }
  }
    Logger.log(count);
}

function pushNoGood(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var objSheet = ss.getActiveSheet();
  var objCell = objSheet.getActiveCell();

// Logger.log("列 : " + objCell.getColumn());
// Logger.log("行 : " + objCell.getRow());

  var range = objSheet.getRange("S" + objCell.getRow() );
  //Logger.log("範囲 : " +  range.getNumColumns());
  var m = GetUser();

  for(var i = 0; i <= 12; i++) {
    if (range.offset(0, -i).getValue() == users[m]){
      // Logger.log(range.offset(0, -i).getValue());
      range.offset(0, -i).setValue("");
      break;
    }
  }

  var ranges = objSheet.getRange("G" + objCell.getRow() + ":" + "R" + objCell.getRow());
  Logger.log(ranges);
  var values = ranges.getValues();

  Logger.log("範囲 : " + values[0].length);
  Logger.log(values[0][0]);
  Logger.log(values[0][values[0].length -1]);
  
  for(i = values[0].length - 1; i >= 0; i-- ){
    Logger.log(i+"は"+values[0][i]);
    
    if(values[0][i] == null || values[0][i] == "" ){
       Logger.log("はいった");
       values[0].splice(i, 1);
       values[0].push('');
    }
  }
  
  Logger.log(values);
  ranges.clear().setValues(values);
}

function GetUser() {
  var objUser = Session.getActiveUser();
  //Browser.msgBox(objUser.getEmail());
  Logger.log(Session.getActiveUser());
  return objUser;
}