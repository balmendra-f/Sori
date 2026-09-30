import {
  AlertCircleIcon,
  AuthButton,
  AuthHeader,
  AuthInput,
  CheckCircleIcon,
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

export default function ForgotScreen() {
  const router = useRouter();
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const isValidEmail = (emailStr: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);

  const handleReset = async () => {
    Keyboard.dismiss();
    setErrorMsg(null);
    setSuccessMsg(null);

    const trimmed = email.trim();
    if (!trimmed || !isValidEmail(trimmed)) {
      setErrorMsg("Por favor ingresa una dirección de correo válida.");
      return;
    }

    setIsLoading(true);
    const { error } = await resetPassword(trimmed);
    setIsLoading(false);

    if (error) {
      setErrorMsg(formatAuthError(error));
    } else {
      setSuccessMsg(
        `Hemos enviado las instrucciones para restablecer tu contraseña a ${trimmed}. Revisa tu bandeja de entrada.`,
      );
    }
  };

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
          {/* Header */}
          <AuthHeader
            title="Recupera tu acceso"
            subtitle="Ingresa el correo asociado a tu cuenta y te enviaremos un enlace seguro para restablecerla"
            showBack={true}
            onBack={() => router.back()}
            showLogo={true}
          />

          {/* Success Banner */}
          {successMsg ? (
            <View
              className="flex-row items-center bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 mb-5"
              style={styles.successBanner}
            >
              <CheckCircleIcon size={20} color="#10b981" />
              <Text
                className="text-emerald-400 text-xs font-medium ml-2.5 flex-1"
                style={styles.successBannerText}
              >
                {successMsg}
              </Text>
            </View>
          ) : null}

          {/* Error Banner */}
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

          {/* Input Field */}
          <View className="mb-2">
            <AuthInput
              label="Correo electrónico"
              placeholder="tu@email.com"
              value={email}
              onChangeText={(val) => {
                setEmail(val);
                if (errorMsg) setErrorMsg(null);
                if (successMsg) setSuccessMsg(null);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              icon={<MailIcon size={18} color="#8e8f99" />}
            />
          </View>

          {/* Submit Action */}
          <AuthButton
            title="Enviar enlace de recuperación"
            onPress={handleReset}
            isLoading={isLoading}
            disabled={!email.trim()}
            variant="primary"
          />

          {/* Footer - Back to Login */}
          <View
            className="flex-row justify-center items-center mt-8"
            style={styles.footer}
          >
            <Text className="text-sm text-[#8e8f99]" style={styles.footerText}>
              ¿Recordaste tu clave?{" "}
            </Text>
            <Pressable
              onPress={() => router.push("/(auth)")}
              hitSlop={8}
              className="active:opacity-70"
            >
              <Text
                className="text-sm font-bold text-[#8b5cf6]"
                style={styles.footerLink}
              >
                Inicia sesión
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
  successBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 185, 129, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.35)",
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
  },
  successBannerText: {
    color: "#34d399",
    fontSize: 13,
    fontWeight: "500",
    marginLeft: 10,
    flex: 1,
    lineHeight: 18,
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
