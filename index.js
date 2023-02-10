const fs = require("fs");
const path = require("path");

const { withDangerousMod, withPlugins } = require("@expo/config-plugins");

const withSetReactNativePackagesStatic = (c) => {
  return withDangerousMod(c, [
    "ios",
    async (config) => {
      const file = path.join(config.modRequest.platformProjectRoot, "Podfile");
      const contents = await fs.promises.readFile(file, "utf8");
      await fs.promises.writeFile(
        file,
        injectStaticNativePackagesMutation(contents),
        "utf8"
      );
      return config;
    },
  ]);
};

const injectStaticNativePackagesMutation = (src) => {
  if (src.search("use_frameworks!") === -1) return src;

  const lines = src.split(/\r?\n/);
  let index = lines.findIndex((line) => line.startsWith(`use_frameworks!`));
  let tempL = lines[index];

  const injection =
    "\tpre_install do |installer|\n\t\tinstaller.pod_targets.each do |pod|\n\t\t\tif !pod.name.start_width?('react-native-shake') || pod.name.start_with?('react-native-') || pod.name.start_with?('ReactNative') || pod.name.start_with?('RN') || pod.name.eql?('RNPermissions') || pod.name.start_with?('Permission-')\n\t\t\t\tdef pod.build_type;\n\t\t\t\t\tPod::BuildType.static_library\n\t\t\t\tend\n\t\t\tend\n\t\tend\n\tend";

  return src.replace(tempL, tempL + "\n" + injection);
};

module.exports = (config) =>
  withPlugins(config, [withSetReactNativePackagesStatic]);
