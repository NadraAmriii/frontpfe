import React, {useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator
} from "react-native";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "react-native-paper";
import AuthContext from "../../AuthContext";
import { adminLogin } from "../../constants";


const SignAd = (props) => {
  const baseUrl = "https://nodeback.onrender.com"
  //const { signIn } = React.useContext(AuthContext);
  //const [hidePassword, setHidePassword] = useState(true);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoading]=useState(false)
  //const [messageType, setMessageType] = useState();
  const [email, setemail] = useState("");
  const [motDepass, setmotDepass] = useState("");
  const { colors } = useTheme();
  const togo = () => {
    props.navigation.push("Acceuill");
  };
  const onChangeHandler = () => {
    setIsLogin(!isLogin);
    setMessage("");
  };

  const onLoggedIn = (token) => {
    setIsLoading(true)
    fetch(`${baseUrl}/admins`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
       
      },
    })
      .then(async (res) => {
        try {
          const jsonRes = await res.json();
          if (res.status === 200) {
            setMessage(jsonRes.message);
            setIsLoading(false)
            set
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSubmitHandler = () => {
    //console.log('token')
    const payload = {
      email,
      motDepass,
    };
    
    fetch(adminLogin, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(payload),
     })
       .then(async (res) => {
         try {
           const jsonRes = await res.json();
           if (res.status !== 200) {
             setIsError(true);
             setMessage(jsonRes.message);
           } else {
             onLoggedIn(jsonRes.token);
             setIsError(false);
             setMessage(jsonRes.message);
             console.log(jsonRes);
             props.navigation.push('Acceuill');
           }
         } catch (err) {
           console.log(err);
         }
       })
       .catch((err) => {
         console.log(err);
       });
   };
  const getMessage = () => {
    const status = isError ? `Error: ` : `Success: `;
    return status + message;
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4A90E2" barStyle="default" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Bienvenue!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}
        >
          Email
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={setemail}
            value={email}
            // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
            keyboardType="email-address"
          />
        </View>

        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}
        >
          Mot DE passe
        </Text>
        <View style={styles.action}>
          <Feather name="lock" size={20} />
          <TextInput
            placeholder="Mot de passe"
            placeholderTextColor="#666666"
            //secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
             onChangeText={setmotDepass}
             value={motDepass}
             secureTextEntry={true}
          />
        </View>
        <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
        <View style={styles.button}>
          <TouchableOpacity
            colors={["#08d4c4", "#01ab9d"]}
            style={styles.signIn}
            onPress={onSubmitHandler}
            // onPress={()=>console.log("ddddd")}
            //onPress={() => {loginHandle( data.username, data.password )}}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "#fff",
                },
              ]}
            >
              Sign In
              {isLoading?<ActivityIndicator size={"small"} color={"#fff"}/>:null}
              
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A90E2",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "#4A90E2",
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  message: {
    fontSize: 16,
    marginVertical: '5%',
},
});
export default SignAd;
