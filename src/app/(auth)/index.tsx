import {
  AlertCircleIcon,
  AuthButton,
  AuthHeader,
  AuthInput,
  LockIcon,
  MailIcon,
} from "@/components/sorae";
import { useAuth } from "@/context/AuthContext";
import { formatAuthError } from "@/utils/authErrors";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const { signInWithPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async () => {
    Keyboard.dismiss();
    setErrorMsg(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMsg("Por favor ingresa tu correo electrónico.");
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setIsLoading(true);
    const { error } = await signInWithPassword(trimmedEmail, password);
    setIsLoading(false);

    if (error) {
      setErrorMsg(formatAuthError(error));
    }
  };

  const isFormIncomplete = !email.trim() || password.length < 6;

  return (
    <SafeAreaView className="flex-1 bg-[#0d0e12]" style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
        style={styles.keyboardView}
      >
        <ScrollView
          className="flex-1 px-6"
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header & Logo */}
          <AuthHeader
            title="Bienvenido de vuelta"
            subtitle="Inicia sesión para escuchar, remezclar y conectar con tus creadores favoritos"
            showLogo={true}
          />

          {/* Error Message Box */}
          {errorMsg ? (
            <View
              className="flex-row items-center bg-red-500/10 border border-red-500/30 rounded-2xl p-3.5 mb-5"
              style={styles.errorBanner}
            >
              <AlertCircleIcon size={18} color="#ef4444" />
              <Text
                className="text-red-400 text-xs font-medium ml-2.5 flex-1"
                style={styles.errorBannerText}
              >
                {errorMsg}
              </Text>
            </View>
          ) : null}

          {/* Input Fields */}
          <View className="mb-2">
            <AuthInput
              label="Correo electrónico"
              placeholder="tu@email.com"
              value={email}
              onChangeText={(val) => {
                setEmail(val);
                if (errorMsg) setErrorMsg(null);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              icon={<MailIcon size={18} color="#8e8f99" />}
            />

            <AuthInput
              label="Contraseña"
              placeholder="••••••••"
              value={password}
              onChangeText={(val) => {
                setPassword(val);
                if (errorMsg) setErrorMsg(null);
              }}
              secureTextEntry
              icon={<LockIcon size={18} color="#8e8f99" />}
            />

            {/* Forgot Password Link */}
            <Pressable
              onPress={() => router.push("/(auth)/forgot")}
              hitSlop={8}
              className="self-end mb-6 active:opacity-70"
              style={styles.forgotLink}
            >
              <Text
                className="text-xs font-semibold text-[#8b5cf6]"
                style={styles.forgotText}
              >
                ¿Olvidaste tu contraseña?
              </Text>
            </Pressable>
          </View>

          {/* Submit Action */}
          <AuthButton
            title="Iniciar Sesión"
            onPress={handleLogin}
            isLoading={isLoading}
            disabled={isFormIncomplete}
            variant="primary"
          />

          {/* Footer - Switch to Sign Up */}
          <View
            className="flex-row justify-center items-center mt-8"
            style={styles.footer}
          >
            <Text className="text-sm text-[#8e8f99]" style={styles.footerText}>
              ¿No tienes una cuenta?{" "}
            </Text>
            <Pressable
              onPress={() => router.push("/(auth)/signUp")}
              hitSlop={8}
              className="active:opacity-70"
            >
              <Text
                className="text-sm font-bold text-[#8b5cf6]"
                style={styles.footerLink}
              >
                Regístrate
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0d0e12",
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 24,
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
  },
  errorBannerText: {
    color: "#f87171",
    fontSize: 13,
    fontWeight: "500",
    marginLeft: 10,
    flex: 1,
  },
  forgotLink: {
    alignSelf: "flex-end",
    marginBottom: 20,
    marginTop: 2,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#8b5cf6",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
  },
  footerText: {
    fontSize: 14,
    color: "#8e8f99",
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "700",
    color: "#8b5cf6",
  },
});
