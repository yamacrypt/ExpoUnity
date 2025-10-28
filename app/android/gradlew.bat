@echo off
set DIR=%~dp0
set APP_BASE_NAME=%~n0
set APP_HOME=%DIR%

set CLASSPATH=%APP_HOME%\gradle\wrapper\gradle-wrapper.jar

set DEFAULT_JVM_OPTS=

if not "%JAVA_HOME%"=="" goto findJavaFromJavaHome

set JAVA_EXE=java.exe
goto init

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME%"
set JAVA_EXE=%JAVA_HOME%\bin\java.exe

:init
if exist "%JAVA_EXE%" goto execute

echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH. 1>&2
goto fail

:execute
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %GRADLE_OPTS% -classpath "%CLASSPATH%" org.gradle.wrapper.GradleWrapperMain %*
:success
exit /b 0

:fail
exit /b 1
