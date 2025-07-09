import { default as colors, default as Colors } from "@/constants/Colors";
import { Dimensions, Platform, StatusBar, StyleSheet, } from "react-native";


// Get the status bar height
export const statusBarHeight = Platform.select({
  ios: StatusBar.currentHeight || 0, // iOS
  android: StatusBar.currentHeight,  // Android
  default: 0,                        // Default fallback
});


export const screenPadding=12;

const { width,height } = Dimensions.get('window'); // Get the screen width
export const screenDimension = Dimensions.get('screen'); // Get the screen width

export { height, width };

const globStyle = StyleSheet.create({
  // Flexbox Controls
   button:{
        backgroundColor: colors.primaryColor,
        padding: 16,
        borderRadius: 8,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
  },
  buttonText:{
     color: '#fff',
    fontSize: 16,
  },
  fixedBottom:{
position:"fixed",
left:0,
width:"100%",
  bottom:"auto",
  },
  flex: {
  display:'flex',
  flexDirection:"row"
  },
  flexItem:{

  display:'flex',
  flexDirection:'row'
  },
  flexGap10:{
    gap:10
  },
  flexGap5:{
    gap:5
  }, 
  flexGap16:{
    gap:16
  },


  flexRow: {
    flexDirection: "row",
  },
  flexColumn: {
    flexDirection: "column",
  },
  flexCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  flexRowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  flexColumnCenter: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  flexStart: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  flexEnd: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  flexBetween: {
    justifyContent: "space-between",
  },
  flexAround: {
    justifyContent: "space-around",
  },
  flexEvenly: {
    justifyContent: "space-evenly",
  },

  // Flex Wrap
  flexWrap: {
    flexWrap: "wrap",
  },
  flexNoWrap: {
    flexWrap: "nowrap",
  },

  // Alignment (Horizontal & Vertical)
  alignCenter: {
    alignItems: "center",
  },
  alignStart: {
    alignItems: "flex-start",
  },
  alignEnd: {
    alignItems: "flex-end",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  justifyStart: {
    justifyContent: "flex-start",
  },
  justifyEnd: {
    justifyContent: "flex-end",
  },

  // Self Alignment
  selfCenter: {
    alignSelf: "center",
  },
  selfStart: {
    alignSelf: "flex-start",
  },
  selfEnd: {
    alignSelf: "flex-end",
  },

  // Stretching Content
  flexStretch: {
    alignItems: "stretch",
  },

  // Shrink and Grow
  flexGrow: {
    flexGrow: 1,
  },
  flexShrink: {
    flexShrink: 1,
  },

  // Full Size Containers
  fullWidth: {
    width: "100%",
  },
  fullHeight: {
    height: "100%",
  },
  fullSize: {
    width: "100%",
    height: "100%",
  },

  // Padding and Margin Utility
  p0: { padding: 0 },
  p1: { padding: 4 },
  p2: { padding: 8 },
  p3: { padding: 16 },
  p4: { padding: 24 },
  p5: { padding: 32 },
  m0: { margin: 0 },
  m1: { margin: 4 },
  m2: { margin: 8 },
  m3: { margin: 16 },
  m4: { margin: 24 },
  m5: { margin: 32 },

  // Gap Utilities (use with flex for spacing)
  gapSmall: {
    gap: 8,
  },
  gapMedium: {
    gap: 16,
  },
  gapLarge: {
    gap: 24,
  },
    imageSquare30: {
      width: 30,
      height: 30,
    },
    imageSquare50: {
      width: 50,
      height: 50,
    },
    imageSquare70: {
      width: 70,
      height: 70,
    },
    imageSquare100: {
      width: 100,
      height: 100,
    },
    imageSquare150: {
      width: 150,
      height: 150,
    },
  
    // Rectangle Images
    imageRect100x50: {
      width: 100,
      height: 50,
    },
    imageRect150x75: {
      width: 150,
      height: 75,
    },
    imageRect200x100: {
      width: 200,
      height: 100,
    },
    imageRect250x125: {
      width: 250,
      height: 125,
    },
    imageRect300x150: {
      width: 300,
      height: 150,
    },
  
    // Circle Images
    imageCircle30: {
      width: 30,
      height: 30,
      borderRadius: 15,
    },
    imageCircle40: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    imageCircle50: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    imageCircle60: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    imageCircle70: {
      width: 70,
      height: 70,
      borderRadius: 35,
    },
    imageCircle80: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    imageCircle100: {
      width: 100,
      height: 100,
      borderRadius: 50,
    },
    imageCircle150: {
      width: 150,
      height: 150,
      borderRadius: 75,
    },
  
    // Borders with white color and different thickness
    borderWhite2: {
      borderWidth: 2,
      borderColor: 'white',
    },
    borderWhite3: {
      borderWidth: 3,
      borderColor: 'white',
    },
    borderWhite4: {
      borderWidth: 4,
      borderColor: 'white',
    },
  
    // Borders with black color and different thickness
    borderBlack1: {
      borderWidth: 1,
      borderColor: 'black',
    },
    borderBlack2: {
      borderWidth: 2,
      borderColor: 'black',
    },
    borderBlack3: {
      borderWidth: 3,
      borderColor: 'black',
    },
  
    // Padding with different values
    padding5: {
      padding: 5,
    },
    padding10: {
      padding: 10,
    },
    padding15: {
      padding: 15,
    },
    padding20: {
      padding: 20,
    },
  
    // Margins with different values
    margin5: {
      margin: 5,
    },
    margin10: {
      margin: 10,
    },
    margin15: {
      margin: 15,
    },
    margin20: {
      margin: 20,
    },
  
    
    // Center alignment styles
    centerContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    centerVertical: {
      justifyContent: 'center',
    },
    centerHorizontal: {
      alignItems: 'center',
    },
  
    // Text styles
    textBold: {
      fontWeight: 'bold',
    },
    textItalic: {
      fontStyle: 'italic',
    },
    textUnderline: {
      textDecorationLine: 'underline',
    },
    textWhite: {
      color: 'white',
    },
    textBlack: {
      color: 'black',
    },
    textYellow: {
      color: 'yellow',
    },
  
    // Border Radius
    borderRadius5: {
      borderRadius: 5,
    },
    borderRadius10: {
      borderRadius: 10,
    },
    borderRadius15: {
      borderRadius: 15,
    },
    borderRadius20: {
      borderRadius: 20,
    },
    shadowGray: {
      shadowColor: "#ccc",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
      elevation: 4, // For Android
    },
    shadowLight: {
      shadowColor: "#ddd",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2, // For Android
    },
    shadowDark: {
      shadowColor: "#333",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.6,
      shadowRadius: 5,
      elevation: 6, // For Android
    },
    shadowNone: {
      shadowColor: "transparent",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    row:{flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
         input:{
              width:"100%",
              borderRadius:6,
              borderColor:Colors.lightGray,
              borderWidth:2,
              paddingHorizontal:12,
              backgroundColor:Colors.white,
              minHeight:48
          }
    ,
    textCenter:{
        textAlign:"center"
    },
    flex1:{
        flex:1
    }
  
});

export default globStyle;
export const iconButtonStyle=StyleSheet.create({
  closeButton: {
    backgroundColor: '#eee',
    width:40,
    height:40,
    borderRadius: 20,
    // position:"absolute",
    right:0,
    top:0
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button:{
        backgroundColor: colors.primaryColor,
        padding: 16,
        borderRadius: 8,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
  },
  buttonText:{
     color: '#fff',
    fontSize: 16,
  }


})

export const screenHeadingSize=22
export const shopRoundedRadius=30;
export const shopBlockRadius=30;
