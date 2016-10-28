if [[ -d "/usr/lib/jvm/java-8-oracle-$ARCH_SUFFIX" ]] ; then
    # Currently unused, because the `travis_java` cookbook doesn't create this architecture specific symbolic link
    ORACLEJDK8_UJA_ALIAS="java-8-oracle-$ARCH_SUFFIX"
    ORACLEJDK8_JAVA_HOME="/usr/lib/jvm/java-8-oracle-$ARCH_SUFFIX"
else
    ORACLEJDK8_UJA_ALIAS="java-8-oracle"
    ORACLEJDK8_JAVA_HOME="/usr/lib/jvm/java-8-oracle"
fi
⋮
switch_to_oraclejdk8 () {
    echo "Switching to Oracle JDK8 ($ORACLEJDK8_UJA_ALIAS), JAVA_HOME will be set to $ORACLEJDK8_JAVA_HOME"
    sudo $UJA --set "$ORACLEJDK8_UJA_ALIAS"
    export JAVA_HOME="$ORACLEJDK8_JAVA_HOME"
}