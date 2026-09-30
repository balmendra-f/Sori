import {
  AlertCircleIcon,
  AuthButton,
  AuthHeader,
  AuthInput,
  CheckCircleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
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

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const validate = () => {
    if (!name.trim()) {
      setErrorMsg("Por favor ingresa tu nombre completo o de artista.");
      return false;
    }
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMsg("Por favor ingresa tu correo electrónico.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMsg("Por favor ingresa un correo electrónico válido.");
      return false;
    }
    if (password.length < 6) {
      setErrorMsg("La contraseña debe contener al menos 6 caracteres.");
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden.");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    Keyboard.dismiss();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!validate()) return;

    setIsLoading(true);
    const { data, error } = await signUp(email.trim(), password, name.trim());
    setIsLoading(false);

    if (error) {
      setErrorMsg(formatAuthError(error));
      return;
    }

    // If Supabase sends a confirmation email (user created but session is null or identities exist)
    if (data?.user && !data?.session) {
      setSuccessMsg(
        "¡Cuenta creada con éxito! Por favor revisa tu bandeja de entrada para verificar tu correo antes de ingresar.",
      );
    }
    // If auto-confirm is enabled in Supabase, the session listener in AuthContext will automatically redirect to (app)
  };

  const isFormIncomplete =
    !name.trim() ||
    !email.trim() ||
    password.length < 6 ||
    confirmPassword.length < 6;

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
            title="Crea tu cuenta"
            subtitle="Únete a la comunidad de productores y amantes de la música electrónica"
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

          {/* Input Fields */}
          <View className="mb-2">
            <AuthInput
              label="Nombre o Alias de Creador"
              placeholder="Ej. Synth Master"
              value={name}
              onChangeText={(val) => {
                setName(val);
                if (errorMsg) setErrorMsg(null);
              }}
              autoCapitalize="words"
              icon={<UserIcon size={18} color="#8e8f99" />}
            />

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
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChangeText={(val) => {
                setPassword(val);
                if (errorMsg) setErrorMsg(null);
              }}
              secureTextEntry
              icon={<LockIcon size={18} color="#8e8f99" />}
            />

            <AuthInput
              label="Confirmar Contraseña"
              placeholder="Repite tu contraseña"
              value={confirmPassword}
              onChangeText={(val) => {
                setConfirmPassword(val);
                if (errorMsg) setErrorMsg(null);
              }}
              secureTextEntry
              icon={<LockIcon size={18} color="#8e8f99" />}
            />
          </View>

          {/* Submit Action */}
          <AuthButton
            title="Crear Cuenta"
            onPress={handleSignUp}
            isLoading={isLoading}
            disabled={isFormIncomplete}
            variant="primary"
          />

          {/* Footer - Switch to Login */}
          <View
            className="flex-row justify-center items-center mt-8 pb-4"
            style={styles.footer}
          >
            <Text className="text-sm text-[#8e8f99]" style={styles.footerText}>
              ¿Ya tienes una cuenta?{" "}
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
    paddingVertical: 20,
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
